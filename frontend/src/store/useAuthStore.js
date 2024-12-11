import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'


const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket:null,
    onlineUsers: [],
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.post("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth: ", error)
            set({authUser:null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigninUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})
            toast.success("Account created successfully")
            get().connectSocket()
        } catch (error) {
            console.log("Error in signup: ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isSigninUp:false})
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/signout")
            set({authUser: null})
            toast.success("Logged Out Successgully")
            get().disconnectSocket()
        } catch (error) {
            console.log("Error in logout: ", error)
            toast.error(error.response.data.message)
        }
    },

    login: async(data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/signin", data)
            set({authUser: res.data})
            toast.success("Logged In successfully")
            get().connectSocket()
        } catch (error) {
            console.log("Error in login: ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("Error in update profile: ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile: false})
        }
    },

    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected) {
            return
        }
        const socket = io(baseUrl, {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect()
        set({socket:socket})
        socket.on("getOnlineUsers", (userId) => {
            set({onlineUsers:userId})
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect()
        }
    }
}))
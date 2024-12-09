import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.post("/auth/check")
            set({authUser:res.data})
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
    }
}))
import toast from 'react-hot-toast'
import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    onlineUsers: [],

    getUsers: async() => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/users")
            set({users: res.data})
            toast.success("Users fetched Successfully")
        } catch (error) {
            console.log("Error in loading Users: ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})
            toast.success("Messages Fetched Successfully")
        } catch (error) {
            console.log("Error in loading Messages: ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (data) => {
        
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
    
}))
import toast from 'react-hot-toast'
import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

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
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data)
            set({messages:[...messages,res.data]})
        } catch (error) {
            console.log("Error in sendMessage: ", error)
            toast.error(error.response.data.message)
        }
    },

    subcribeToMessages: () => {
        const {selectedUser}= get()
        if(!selectedUser) {
            return
        }

        const socket = useAuthStore.getState().socket
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) {
                return
            }
            set({messages: [...get().messages, newMessage],
            })
        })
    },

    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
    
}))
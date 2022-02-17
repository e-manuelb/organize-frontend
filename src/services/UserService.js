import axios from './Connection';

export const UserService = {
    async register() {
        await axios.post('/users/')
    },
    async update(id) {
        await axios.patch(`/users/${id}`)
    }
}
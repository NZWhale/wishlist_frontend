export interface IWishRow {
    userId: string
    wishId: string
    title: string
    description: string
    isPublic: boolean | string[]
}

export interface IRoomRow {
    creatorId: string
    roomId: string
    roomName: string
    users: string[]
}

export interface IUserRow {
    userId: string
    nickname: string | null
    email: string
}
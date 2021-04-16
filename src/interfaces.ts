export interface IWishRow {
    userId: string
    wishId: string
    title: string
    description: string
    isPublic: boolean
}

export interface IRoomRow {
    creatorId: string
    roomId: string
    roomName: string
    users: IUserRow[]
}

export interface IUserRow {
    userId: string
    nickname: string | null
    email: string
}
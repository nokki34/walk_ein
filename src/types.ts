type Timeslot = {
    date: Date
    dateString: string
    assignee?: User
}

type User = {
    telegramId: string
    name: string
}


export {Timeslot, User,}
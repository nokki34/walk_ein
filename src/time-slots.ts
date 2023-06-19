type Timeslot = {
    date: Date
    dateString: string
    assignee?: User
}

type User = {
    telegramId: string
    name: string
}

const addAssignee = (slot: Timeslot, assignee: User) => {
    slot.assignee = assignee 
}

export {Timeslot, User, addAssignee }
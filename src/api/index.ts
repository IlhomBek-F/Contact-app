import type { ContactType } from "../core/models/ContactModel";

const data = [
  {
    id: Date.now() + 1,
    name: 'John',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    id: Date.now() + 2,
    name: 'Doe',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    id: Date.now() + 3,
    name: 'Susan',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    id: Date.now() + 4,
    name: 'Eric',
    email: 'example@gmail.com',
    phone: 888281211
  },
];


export async function getContacts(query: string = '') {
    try {
        const tasks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const res = data.slice().filter(({email, name}: ContactType) => email.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()))
                resolve(res)
            }, 2000)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}

export async function saveContact(newContact: ContactType) {
    try {
        const res = await new Promise((resolve, reject) => {
            setTimeout(() => {
              data.push(newContact)
              resolve(newContact)
            }, 2500)
        })

        return res
    } catch (error) {
        console.log(error)
    }
}

export async function updateContact(data: ContactType) {
    try {
        const res = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(data)
            }, 2500)
        })

        return res
    } catch (error) {
        console.log(error)
    }
}

export async function deleteContact(id: number) {
    try {
        const res = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(id)
            }, 2500)
        })

        return res
    } catch (error) {
        console.log(error)
    }
}
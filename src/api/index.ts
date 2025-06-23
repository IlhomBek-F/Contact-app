
const data = [
  {
    name: 'John',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    name: 'Doe',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    name: 'Susan',
    email: 'example@gmail.com',
    phone: 888281211
  },
  {
    name: 'Eric',
    email: 'example@gmail.com',
    phone: 888281211
  },
];


export async function getContacts() {
    try {
        const tasks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data)
            }, 2000)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}
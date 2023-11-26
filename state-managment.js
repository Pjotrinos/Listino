import { atom } from 'jotai'
export const ListsAtom = atom([{
    id: "s1o6s2oq83",
    listName: "Nákupní seznam pro oslavu",
    owner: {
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Milota Hodny",
      },
    description: "seznam věcích potřebných na oslavu",
    imageLink: "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?auto=format&fit=crop&q=80&w=3537&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tasks: [
        {taskText: 'Mléko', isDone: false, id: "1"},
        {taskText: 'Dort', isDone: false, id: "2"},
        {taskText: 'Štafle', isDone: true, id: "3"},
        {taskText: 'Provaz', isDone: false, id: "4"},
        {taskText: 'Konfety', isDone: false, id: "5"},
        {taskText: 'Plyšák', isDone: true, id: "6"}
      ],
    sharedUsers:[
        {
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          name: "Janus Veliky",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
          name: "Venuše Zákaznicá",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258b2462d826712e",
          name: "Lukáš Novák",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258c2462d826712f",
          name: "Eva Pospíšilová",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258d2462d826712g",
          name: "Martin Novotný",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258e2462d826712h",
          name: "Anna Kovářová",
        }
      ],
    archived: false
},
{
    id: "812081",
    listName: "Příprava na dovolenou",
    owner: {
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Milota Hodny",
      },
    description: "",
    imageLink: "https://images.unsplash.com/photo-1698725224250-afb10355c2c4?q=80&w=5071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tasks: [
        {taskText: 'Mléko', isDone: false, id: "1"},
        {taskText: 'Dort', isDone: false, id: "2"},
        {taskText: 'Štafle', isDone: true, id: "3"},
        {taskText: 'Provaz', isDone: false, id: "4"},
        {taskText: 'Konfety', isDone: false, id: "5"},
        {taskText: 'Plyšák', isDone: true, id: "6"}
      ],
    sharedUsers:[
        {
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          name: "Janus Veliky",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
          name: "Venuše Zákaznicá",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258b2462d826712e",
          name: "Lukáš Novák",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258c2462d826712f",
          name: "Eva Pospíšilová",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258d2462d826712g",
          name: "Martin Novotný",
        },
        {
          avatar: "https://i.pravatar.cc/150?u=a04258e2462d826712h",
          name: "Anna Kovářová",
        }
      ],
    archived: true
}
])
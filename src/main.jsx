// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";

import { Server, Model } from "miragejs";

new Server({
  models: {
    listino: Model
  },

  seeds(server){
    server.create("listino", {
      id: "s1o6s2oq83",
      listName: "Nákupní seznam pro oslavu",
      owner: {
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Milota Hodny",
      },
      description: "seznam věcích potřebných na oslavu",
      imageLink:
        "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?auto=format&fit=crop&q=80&w=3537&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [
        { taskText: "Mléko", isDone: false, id: "1" },
        { taskText: "Dort", isDone: false, id: "2" },
        { taskText: "Štafle", isDone: true, id: "3" },
        { taskText: "Provaz", isDone: false, id: "4" },
        { taskText: "Konfety", isDone: false, id: "5" },
        { taskText: "Plyšák", isDone: true, id: "6" },
      ],
      sharedUsers: [
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
        },
      ],
      archived: false
    })

    server.create("listino",{
      id: "812081",
      listName: "Příprava na dovolenou",
      owner: {
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Milota Hodny",
      },
      description: "",
      imageLink:
        "https://images.unsplash.com/photo-1698725224250-afb10355c2c4?q=80&w=5071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [
        { taskText: "Mléko", isDone: false, id: "1" },
        { taskText: "Dort", isDone: false, id: "2" },
        { taskText: "Štafle", isDone: true, id: "3" },
        { taskText: "Provaz", isDone: false, id: "4" },
        { taskText: "Konfety", isDone: false, id: "5" },
        { taskText: "Plyšák", isDone: true, id: "6" },
      ],
      sharedUsers: [
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
        },
      ],
      archived: true
    })

    server.create("listino",{
      id: "1290192",
      listName: "Seznam vánočních přání",
      owner: {
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Milota Hodny",
      },
      description: "",
      imageLink:
        "https://images.unsplash.com/photo-1700910290958-c58b42601b32?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [
        { taskText: "dárek", isDone: false, id: "1" },
        { taskText: "10 bodu z fronend", isDone: false, id: "2" },
        { taskText: "zmrzlina", isDone: false, id: "3" },
      ],
      sharedUsers: [
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
      ],
      archived: false
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/lists", (schema) => {
      return schema.listinos.all()
    });

    this.get("/list/:id", (schema, request) => {
      console.log("Heloo")
      const listId = request.params.id;
      const list = schema.listinos.findBy({ id: listId });
      return list;
    });

    this.post('/list/create', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      return schema.listinos.create(attrs)
    });

    this.post('/lists/archive/:id', (schema, request) => {
      const listId = request.params.id;
      
      // Find the listinos model by ID
      const ToUpdate = schema.listinos.findBy({"id": listId});
      ToUpdate.attrs.archived = !ToUpdate.attrs.archived


      // Update the model's attributes
      ToUpdate.update(ToUpdate.attrs);
 
      return ToUpdate.attrs;
    });

    this.post('/list/:id/update', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      const listId = request.params.id;

      // Find the listinos model by ID
      const ToUpdate = schema.listinos.findBy({"id": listId});
 
      // Update the model's attributes
      ToUpdate.update(attrs);

      return attrs;
    });
    
  },
});
// //React routerr
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);

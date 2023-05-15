"use client";

import {useEffect, useState} from "react";
import {ApiMethod, getData} from "../store";
import {UsersList} from "./users-list";
import {TUser} from "../../../src/types/firebase";

export default function Home() {
  const [users, setUsers] = useState<TUser[]>([])
  useEffect(() => {
    const getUsers = async () => {
      const response = await getData<TUser[]>(ApiMethod.POST, 'get-users');
      setUsers(response);
    }

    getUsers();
  }, [])

  return (
    <main>
      <UsersList users={users} />
    </main>
  )
}

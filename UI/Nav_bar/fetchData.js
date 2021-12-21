import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

//
export const promiseTimeout = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long!'))
    }, sec)
  })
}

// ====================
export const signUserObj = {
  fullname: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export const loginUserObj = { email: '', password: '' }

// DATA FETCHING....
export const fetchData = async (url, data, type) => {
  const header =
    type === 'signUp'
      ? {
          'Content-Type': 'multipart/form-data',
        }
      : {
          'Content-Type': 'application/json',
        }

  try {
    return Promise.race([
      await axios.post(url, data, {
        headers: header,
      }),
      promiseTimeout(3000),
    ])
  } catch (error) {
    console.log(error.response.data)
    if (error.response) throw error.response.data
  }
}

export const handleLogout = async () => {
  try {
    await axios('/api/user/logOut')
    window.location.assign('/')
  } catch (err) {
    console.log(err)
  }
}

// for (let key of fd.keys()) {console.log(key, fd.get(key))}
// await fetchData('/api/user/signUp', fd, 'signup')

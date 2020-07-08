import { writable } from 'svelte/store'

// WRITABLE
export const menuBarText = writable(false)
export const location = writable('index')
export const filterTerm = writable(false)


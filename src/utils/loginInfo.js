export const saveLoginInfo = (info) => {
    sessionStorage.setItem('loginInfo', JSON.stringify(info))
}

export const getLoginInfo = () => {
    return JSON.parse(sessionStorage.getItem('loginInfo'))
}

export const adminLogout = () => {
    sessionStorage.removeItem('loginInfo')
}

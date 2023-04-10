export const getStatus = (status) => {
    let turnStatus = ''
    switch (status) {
        case 'normal': {
            turnStatus = '正常'
            break
        }
        case 'delete': {
            turnStatus = '删除'
            break
        }
        case 'normal': {
            turnStatus = '正常'
            break
        }
    }
}

export const trunKnowlegdeCase = (s) => {
    let t = ''
    switch (s) {
        case 'knowledge': {
            t = '知识区'
            break
        }
        case 'case': {
            t = '案例区'
            break
        }
    }
    return t
}

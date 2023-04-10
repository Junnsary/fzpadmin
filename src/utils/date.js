import moment from 'moment'

export const getFormatDate = (date) => {
    return moment(date).format('YY-MM-DD hh:mm')
}

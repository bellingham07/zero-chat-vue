import {ElMessage} from "element-plus";

export const SuccessInfo = (message) => {
    ElMessage({
        showClose: true,
        message: message,
        type: 'success',
    })
}

export const ErrorInfo = (message) => {
    ElMessage.error(message)
}

export const TimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // JavaScript中时间戳是毫秒级的，所以乘以1000
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需加1
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
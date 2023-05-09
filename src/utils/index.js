export const pathMap = {
    articlemanager: '管理文章',
    videomanager: '管理管理',
    postarticle: '发布文章',
    postvideo: '发布视频',
    tagmanager: '管理标签',
    adminpasswd: '修改系统密码',
    index: '首页',
    reviewquestion: '审核提问',
    questionmanagement: '管理提问',
    posttopic: '发布自测题目',
    topicmanagement: '管理自测题目',
    topictypemanagement: '管理自测题目类型',
}

export function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}
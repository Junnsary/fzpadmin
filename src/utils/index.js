export const pathMap = {
    articlemanager: '文章管理',
    videomanager: '视频管理',
    postarticle: '发布文章',
    postvideo: '发布视频',
    tagmanager: '标签管理',
    adminpasswd: '修改密码',
    index: '首页',
    reviewquestion: '审核提问',
    questionmanagement: '管理提问',
    posttopic: '发布自测题目',
    topicmanagement: '自测题目',
    topictypemanagement: '自测题目类型',
}

export function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}
const getters =  {
  // 获取当前的播放进度
  getCurrentTime: state => state.currentTime,
  // 获取音乐的播放时长
  getMusicDuration: state => state.musicDuration,
  // 音乐开始加载
  getIsLoadStart: state => state.musicLoadStart,
  
  getProgerssWidth: state => state.progerssWidth,
  // 当前音乐的详细信息，在播放列表里通过当前音乐的下标获取
  getCurrentMusic: state => state.musicList[state.currentMusicIndex],
  getplayState: state => state.playState
}
export default getters
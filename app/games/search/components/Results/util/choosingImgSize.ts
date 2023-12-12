interface props
{
  url:string
  size:"cover_small"|"screenshot_med"|"cover_big"|"logo_med"|"screenshot_big"|"screenshot_huge"|"thumb"|"micro"|"720p"|"1080p"
}

export default function choosingImgSize({url,size}:props)
{
  if(!url)return ''
  const myUrlSplitted= url.split('/')
  myUrlSplitted[myUrlSplitted.length-2]=`t_${size}`
  return myUrlSplitted.join('/')
}
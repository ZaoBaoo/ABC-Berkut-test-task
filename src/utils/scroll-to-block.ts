export const scrollToBlock = (selector: string) => {
  const element = document.querySelector(selector)

  if (!element) throw new Error('Селектор не найден')

  element.scrollIntoView({ behavior: 'smooth' })
}

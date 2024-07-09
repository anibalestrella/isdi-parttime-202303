export default function ButtonAction({ children, tag: Tag = "button", className, ...props }) {
    console.debug(`///// ButtonAction -> render`)
    return <Tag className={`
    text-[0px]
    text-white 
    hover:text-red 
    border-none
    cursor-pointer
    self-center
    transition-all
    ease-in
    duration-500 ${className ? `${className} ` : ''}`} {...props}>
        {children}
    </Tag>
}
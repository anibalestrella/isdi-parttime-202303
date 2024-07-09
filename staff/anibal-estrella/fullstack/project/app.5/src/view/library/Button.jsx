export default function Button({ children, tag: Tag = "button", className, ...props }) {
    console.debug(`///// Button -> render`)
    return <Tag className={` mt-2 bg-lime-300 tracking-tight text-gwhite text-xs uppercase rounded-full min-w-[6rem]  h-11 px-6 hover:drop-shadow-lg hover:bg-lime-200 active:drop-shadow-none active:bg-lime-100 ${className ? `${className} ` : 'w-full'}`} {...props}>
        {children}
    </Tag>
}
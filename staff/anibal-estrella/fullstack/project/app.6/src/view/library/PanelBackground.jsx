export default function PanelBackgroundCloseClose({ onCancel, children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// PanelBackgroundClose -> render`)
    return <Tag id='PanelBackgroundClose' className={`fixed top-0 left-0 flex flex-col z-10 backdrop-blur-md centerXY bg-gray-400/90 p-4 ${className ? `${className} ` : ''}${type ? `Container--${type}` : ''}`} {...props} onClick={onCancel}>
        {children}
    </Tag>
}

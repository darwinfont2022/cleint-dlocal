export const create = (src: string) => {
    const script: HTMLElement = document.createElement('script');
    script.setAttribute('src', src);
    
    document.head.appendChild(script);
    return script;
}

export const removeScript = (src: string) => {
    document.querySelector(`script[src="${src}"]`)?.remove();
}
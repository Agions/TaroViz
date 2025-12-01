declare module 'react-dom' {
  export function render(
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    container: Element | null,
    callback?: () => void
  ): React.ReactInstance;
}

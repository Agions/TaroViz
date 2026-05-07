declare module 'react-dom' {
  export function render(
    _element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    _container: Element | null,
    _callback?: () => void
  ): React.ReactInstance;
}

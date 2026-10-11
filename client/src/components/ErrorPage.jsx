import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return <div>
        <h2>Oh Snap! Something went sideways!</h2>
        <div>{error}</div>
    </div>
}

export default ErrorPage
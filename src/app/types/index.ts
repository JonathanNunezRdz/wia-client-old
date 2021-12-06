import { RouteComponentProps } from '@reach/router';

export interface CustomRouteComponentProps extends RouteComponentProps {
	exact?: boolean;
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

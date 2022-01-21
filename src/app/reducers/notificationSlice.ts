// todo
type AnimeNotification = {
	animeFrom: string;
};

type MangaNotification = {
	mangaFrom: string;
};

type VideogameNotification = {
	videogameFrom: string;
};

type WaifuNotification = {
	waifuFrom: string;
	as: number;
};

type TradeNotification = {
	toAlias: string;
};

type Notification = {
	fromAlias: string;
	date: Date;
	type: number;
} & (
	| TradeNotification
	| WaifuNotification
	| AnimeNotification
	| MangaNotification
	| VideogameNotification
);

const some: Notification = {
	fromAlias: 'jo',
	date: new Date(),
	type: 1,
	animeFrom: '',
};

export default some;

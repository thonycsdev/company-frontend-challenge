export type CompanyResponseType = {
	id: number;
	code: string;
	documento: string;
	name: string;
	maillist: string;
	contatosTecnicos: string;
	tecnologias: string;
	ativo: boolean;
	companiesContacts: any[];
	companiesTechnologies: any[];
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	excluido: boolean;
};

export type CompanyResquestType = {
	id?: number;
	documento: string;
	name: string;
	mailList: string;
	contatosTecnicos: string;
	tecnologias: string;
};

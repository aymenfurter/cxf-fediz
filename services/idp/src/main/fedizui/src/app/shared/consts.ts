export class Consts {    
    public static get URL_PREFIX():string { return "../services/rs/"; }
    public static get TEST_URL():string {return "applications"; }

    // Until we have Paging
    public static get LISTSIZE():string { return "500"; }
    public static isLoggedIn: boolean = false;
}

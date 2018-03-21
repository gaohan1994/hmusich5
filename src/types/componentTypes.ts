export type UserType = {
    _id         : string;
    name        : string;
    headimgurl  ?: string;
    singer      ?: string;
};

export type SingerType = {
    _id     : string;
    name    : string;
    pics    ?: Array<string>; 
};

export type MusicType = {
    _id     : string;
    avs     : Array<Object>;
    collect : number;
    labels  : Array<any>;
    name    : string;
    origin  : number;
    pics    : Array<string>;
    singers : Array<SingerType>;
    status  ?: number;
    user    : UserType;
    words   : Array<string>;
};

export type PlaylistType = {
    _id         : string;
    collect     : number;
    create_date : string;
    desc        ?: string;
    genres      : Array<Object>;
    musics      : Array<MusicType>;
    name        : string;
    pics        : Array<string>;
    renew_at    ?: string;
    status      : number;
    user        : UserType;
};

export type TribeType = {
    _id             : string;
    article_count   : number;
    comment_count   : number;
    desc            : string;
    headimg         : string;
    member_count    : number;
    name            : string
};

export type TribesType = {
    _id         : string;
    create_date : string;
    status      : number;
    tribe       : TribeType;
    type        : number;
};
import mongoose from "mongoose";

import {UserSchema as User} from "../data/Models/UserSchema.es6";

const TEST_DB = 'mongodb://mongodb/test';

mongoose.connect(TEST_DB);

let userRichard = new User({
    name: "Richard",
    surname: "Stallman",
    mail: "example@example.com",
    type: "user"
});

let userDonald = new User({
    name: "Donald",
    surname: "Knuth",
    mail: "example@example.com",
    type: "user"
});

let userLinus = new User({
    name: "Linux",
    surname: "Torvalds",
    mail: "example@example.com",
    type: "user"
});

let userTim = new User({
    name: "Tim",
    surname: "Berners-Lee",
    mail: "example@example.com",
    type: "user"
});

let userMark = new User({
    name: "Mark",
    surname: "Zuckerberg",
    mail: "example@example.com",
    type: "user"
});


userRichard.save();
userDonald.save();
userLinus.save();
userTim.save();
userMark.save();


setTimeout(function () {
    console.log(userRichard.id);
    mongoose.disconnect();
}, 1000);
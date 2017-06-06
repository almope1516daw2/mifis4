import mongoose from "mongoose";


let userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    salt: String,
    hash: String,
    type: String
});

userSchema.set('toJSON', {getters: true});

let User = mongoose.model('User', userSchema);

exports.userSchema = User;







let domainSchema = new mongoose.Schema({
    names: {
        type: [String],
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true
    }
});

domainSchema.set('toJSON', {getters: true});



let domainModel= mongoose.model('Domain', domainSchema, 'domains');
exports.domainSchema = domainModel;

function getUserById(id) {
    return new Promise((resolve, reject) => {
        User.findOne({id: id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

exports.getUserById = getUserById;

exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.getListOfUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.addRegister = ({name, surname, mail, image, salt, hash}) => {
    User.findOne({mail: mail}).exec((err, res) => {
        if (res === null) {

            let domainName = mail.substr(mail.indexOf("@") + 1);
            domainModel.findOne({names: domainName}).exec((err, res) => {
                if (res === null) {
                    console.log("NULL MAIL")
                } else {
                    console.log("FOUND MAIL: " + res.names + " | " + res.quantity);
                    if(res.quantity === 0){
                        console.log("NOT AVALIABLE")
                    } else {
                        console.log("FOUND MAIL: " + res.names + " | " + res.quantity);
                        res.quantity--;
                        res.save();

                        let newUser = new User({
                            name: name,
                            surname: surname,
                            mail: mail,
                            image: image,
                            salt: salt,
                            hash: hash
                        });
                        let apiKey = 'key-1aae833bae423813bf1e81d378dc216b';
                        let domain = 'sandboxaa708984991b4bfd86c8d8fa759302c8.mailgun.org';
                        let mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
                        let data = {
                            from: 'Mifisio <postmaster@sandboxaa708984991b4bfd86c8d8fa759302c8.mailgun.org>',
                            to: mail,
                            subject: 'Gracias por registrarte',
                            text: 'Saludos ' + name + ".\n Gracias por registrarte en Mifisio."
                        };
                        mailgun.messages().send(data, function (error, body) {
                        });



                        return new Promise((resolve, reject) => {
                            newUser.save((err, res) => {
                                err ? reject(err) : resolve(res);
                            });
                        });
                    }
                }
            });

        }
        else {
            console.log("User already registered");
            return null;
        }
    });
};

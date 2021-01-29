const MAX_TITLE_LEN = 10;
function storeSNT(message, args) {
    console.log('Message: ');
    console.log(message);
    console.log('-------------------------------------------------------');
    console.log('Args:')
    console.log(args);
    console.log('-------------------------------------------------------');
    console.log('Content:')
    console.log(message.content);
    console.log('-------------------------------------------------------');
    console.log('Attachments:')
    console.log(message.attachments);
    
    sntRegister(message);
}

// Work on API first
// Make sure you can upload a discord CDN image, download it, and store it in S3
// Then make sure you gather all the relevant information
// and THEN use the API to make a call and add all of that at once
// Only then can you start working on this (once you get all the API above working)

const sntRegister = function(message) {
    let sntReg = {
        title,
    }
    message.channel.send('Please enter a title for your show and tell')
        .then((msg) => {
            msg.channel.awaitMessages(response => response.content, {
                max: 1,
                time: 20000,
                errors: ['time'],
            }).then((collected) => {
                console.log('-------------------------------------------------------');
                console.log('Collected:')
                console.log(collected);
                sntReg.title = collected.first().content;
            }).catch(() => {
                msg.channel.send('You took too long. Think of a title, then try to register again!');
            })
        })
    return sntReg;
}

module.exports = {
    name: 'snt',
    description: 'Show and tell keeper',
    execute(message, args) {
        storeSNT(message, args);
    },
};
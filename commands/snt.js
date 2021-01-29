const MAX_TITLE_LEN = 10;
async function storeSNT(message, args) {
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
    
    await sntRegister(message);
}

const sntRegister = async function(message) {
    let sntTitle;
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
                sntTitle = collected.first().content;
                while (sntTitle.length > MAX_TITLE_LEN) {
                    message.channel.send('Please enter a title for your show and tell')
                        .then((msg) => {
                            msg.channel.awaitMessages(response => response.content, {
                                max: 1,
                                time: 5000,
                                errors: ['time'],
                            }).then((collected) => {
                                console.log('-------------------------------------------------------');
                                console.log('Collected:')
                                console.log(collected);
                                sntTitle = collected.first().content;
                                msg.channel.send(`Your title: ${sntTitle}`);
                            }).catch(() => {
                                msg.channel.send('Something went wrong, I think.')
                            });
                        })
                }
                msg.channel.send(`Your title: ${sntTitle}`);
            }).catch(() => {
                msg.channel.send('You took too long. Think of a title, then try to register again!')
            });
            
        });
}

const reqTitle = function(message) {
    // Make a function here to get the title
    // Make it return either the title
    // or an error code (int? number?)
    // if error, make the calling function call this again until
    // we get the right error
    
}

module.exports = {
    name: 'snt',
    description: 'Show and tell keeper',
    execute(message, args) {
        storeSNT(message, args);
    },
};
function storeSNT(message, args) {
    const desc = args.join(' ');
    let queryTerm;
    if (args.length > 1) {
        queryTerm = args.join('%20');
    } else {
        queryTerm = args[0];
    }
    console.log('Message: ');
    console.log(message);
    console.log('-------------------------------------------------------');
    console.log('Args:')
    console.log(args);
}

module.exports = {
    name: 'snt',
    description: 'Show and tell keeper',
    execute(message, args) {
        storeSNT(message, args);
    },
};
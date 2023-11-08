const checkMessage = message => {
  const tagRegex = /<([a-z][a-z0-9]*)(?:\s+[^>]*)?>|<\/([a-z][a-z0-9]*)>/gi;
  const stack = [];

  let match;
  while ((match = tagRegex.exec(message)) !== null) {
    const openingTag = match[1];
    const closingTag = match[2];

    if (openingTag) {
      stack.push(openingTag);
    } 
    else if (closingTag) {
      if (stack.length === 0) {
        return false;
      }

      const lastOpeningTag = stack.pop();

      if (lastOpeningTag !== closingTag) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

module.exports = checkMessage;

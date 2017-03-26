File 
    = (Statement / EmptyLine)*

Statement 
    = (Block / Import / EmptyLine)
  
Block 
    = BlockHead BlockBody

BlockHead 
    = Word*

BlockBody 
    = "{" Property* "}"

Import
    = "import" RestOfLine

Property
    = _ Word _ ":" _ Expression "," _

Expression
    = String / Array / Object

String
    = "'" [^']* "'" / "\"" [^"]* "\""

Array
    = "[" [^\]]* "]"

Object
    = "{" Property* "}"

FunctionExpression
    = Word "(" Arguments ")" BlockBody

Arguments
    = _(Word / ((Word ",") + Word) / _ )_

Word 
    = [a-zA-Z0-9]+ _?

RestOfLine
    = [^\n]* "\n"

EmptyLine 
    = __? "\n"

_ "whitespace" 
    = [ \t\n\r]*

__ "whitespace no newline"
    = [ \t\r]*

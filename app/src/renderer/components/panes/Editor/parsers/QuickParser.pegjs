File
    = statements:Statement* {
        var result = ''
        statements.forEach(function(statement) {
            if (statement.exportObject) {
                result = statement.exportObject
            }
        })
        return result
    }

ExportBlock
    = "export default" _ "{" exportObjectBlocks:InternalBlock* "}" {
        return {
            exportObject: exportObjectBlocks.join('')
        }
    }

InternalBlock
    = start:[^{}]* "{" middle:(InternalBlock / [^{}])* "}" end:[^{}]* {
        return start.join('') + "{" + middle.join('') + "}" + end.join('')
    }

Statement
    = ExportBlock / AnyLine

AnyLine
    = line:[^\n]* "\n" {return line.join('')}

_ "whitespace" 
    = [ \t\n\r]*
/*
Interface Segregation principle:
PART1: 
Clients should not be forced to depend on interfaces they do not use.

PART2:
1. ISP violations often lead to LSP violations, but not always.
2. If violating ISP causes incorrect behavior when substituting a class, then LSP is also violated.
3. If the class can still function as a valid substitute, LSP might not be violated, even though ISP is.

WE CANNOT EXTEND MULTIPLE INTERFACES IN JS. SO FIGURE OUT THE APPROACH
CHECK TO CREATE A CONSTRUCTOR THAT DOES'NT ALLOW TO CREATE ITS INSTANCE (ABSTRACT CLASS IMPLEMENTATION IN JS)
*/
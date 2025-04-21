/*
In technical terms, the Facade Design Pattern:

Provides a unified, higher-level interface to a set of interfaces in a subsystem.

Simplifies interactions with complex systems by exposing a single entry point.

Decouples clients from the internal workings of the subsystem, promoting loose coupling.

It does not add new functionality — it just makes existing functionality easier to use.

Client ---> Facade ---> Subsystems (ClassA, ClassB, ClassC)
Client talks to Facade, and Facade talks to Subsystem classes internally.

Real-world technical analogy:
When you make an online payment, you use a simple payment API.
Behind the scenes, it’s dealing with authentication, transaction verification, database updates, security, etc.
You don’t need to worry about all that — the API (facade) handles it.
*/
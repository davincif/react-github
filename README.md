# React GitHub Proj

A quick web site, with 2 pages to search a github user

## How to run the project

- Install it:

  `npm ci`

<br>

- Run on dev mode:

  `npm start`

## Considerations

A quick view on what passed throw my mind when thinking how to best solve the challange

### Architecture

The **presenters** should be, in theroy where all the "hard logic", that is to say: everything realted to the manipulation of data that is not _directly and only_ related to ui change should be treate in. That patter is still a challange to apply 100% in React.

### Architecture (Accessing API)

I tried loosely emulating the **repository** patter and the "dummy" component one. Both need a lot of working for a real world scenario use.

### Testing

The above section brings me to the next thing: testihng. I knew I would have very little time to for challange, and with my very little previous knowledge about it, I simplet put it aside, 'cause I woudn'lt be able to do it in time. Sorry about that.

### strong use of typing

Perhaps the best thing in typscript, use it! Typing helps a lot to apply patterns like the Hexagonal, for exemplo. So the **models** came to make a better "clue" betweeen the layers of the software. So the user of an API (for instance) could foresee how it's used and what it returns

### CSS patter

The more specific the better! I tried using the **BEM** patter. Plus, generalizing everything that would be globally needed by the application. Nevertheless, to avoid mess on tha regard, the less use of the "!important" property and the higher the level of specificity of a style, the better, so the lesser the change of leaking style and causing an unpretictable behaviour.

<hr>

#### **Thank you**, Leonardo Da Vinci.

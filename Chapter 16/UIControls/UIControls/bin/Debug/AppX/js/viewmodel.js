(function () {
    "use strict";

    WinJS.Namespace.define("ViewModel", {
        data: {
            images: new WinJS.Binding.List([
                { file: "/images/data/aster.jpg", name: "Aster"},
                { file: "/images/data/carnation.jpg", name: "Carnation"},
                { file: "/images/data/daffodil.jpg", name: "Daffodil"},
                { file: "/images/data/lily.jpg", name: "Lilly"},
            ]),

            extraImages: [{ file: "/images/data/orchid.jpg", name: "Orchid"},
                { file: "/images/data/peony.jpg", name: "Peony"},
                { file: "/images/data/primula.jpg", name: "Primula"},
                { file: "/images/data/rose.jpg", name: "Rose"},
                { file: "/images/data/snowdrop.jpg", name: "Snowdrop" }],

            letters: new WinJS.Binding.List(),
            groupedLetters: null,

            names: new WinJS.Binding.List(),
            groupedNames: null,
        },
    });
   
    var src = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
                "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    src.forEach(function (item, index) {
        ViewModel.data.letters.push({
            letter: item,
            group: index % 3
        });
    });

    ViewModel.data.groupedLetters = ViewModel.data.letters.createGrouped(
        function (item) { return item.group.toString(); },
        function (item) {
            //return "Group " + item.group;
            return {
                title: "Group " + item.group
            };
        },
        function (g1, g2) { return g1 - g2; }
    );

    var namesSrcData = ['Aaliyah', 'Aaron', 'Abigail', 'Abraham', 'Adam', 'Addison',
    'Adrian', 'Adriana', 'Aidan', 'Aiden', 'Alex', 'Alexa', 'Alexander', 'Alexandra',
    'Alexis', 'Allison', 'Alyssa', 'Amelia', 'Andrew', 'Angel', 'Angelina',
    'Anna', 'Anthony', 'Ariana', 'Arianna', 'Ashley', 'Aubrey', 'Austin', 'Ava',
    'Avery', 'Ayden', 'Bella', 'Benjamin', 'Blake', 'Brandon', 'Brayden', 'Brian',
    'Brianna', 'Brooke', 'Bryan', 'Caleb', 'Cameron', 'Camila', 'Carter', 'Charles',
    'Charlotte', 'Chase', 'Chaya', 'Chloe', 'Christian', 'Christopher', 'Claire',
    'Connor', 'Daniel', 'David', 'Dominic', 'Dylan', 'Eli', 'Elijah', 'Elizabeth',
    'Ella', 'Emily', 'Emma', 'Eric', 'Esther', 'Ethan', 'Eva', 'Evan', 'Evelyn',
    'Faith', 'Gabriel', 'Gabriella', 'Gabrielle', 'Gavin', 'Genesis', 'Gianna',
    'Giovanni', 'Grace', 'Hailey', 'Hannah', 'Henry', 'Hunter', 'Ian', 'Isaac',
    'Isabella', 'Isaiah', 'Jack', 'Jackson', 'Jacob', 'Jacqui', 'Jaden', 'Jake',
    'James', 'Jasmine', 'Jason', 'Jayden', 'Jeremiah', 'Jeremy', 'Jessica', 'Joel',
    'John', 'Jonathan', 'Jordan', 'Jose', 'Joseph', 'Joshua', 'Josiah', 'Julia',
    'Julian', 'Juliana', 'Julianna', 'Justin', 'Kaitlyn', 'Katherine', 'Kayla',
    'Kaylee', 'Kevin', 'Khloe', 'Kimberly', 'Kyle', 'Kylie', 'Landon', 'Lauren',
    'Layla', 'Leah', 'Leo', 'Liam', 'Lillian', 'Lily', 'Logan', 'London', 'Lucas',
    'Luis', 'Luke', 'Mackenzie', 'Madeline', 'Madelyn', 'Madison', 'Makayla', 'Maria',
    'Mason', 'Matthew', 'Max', 'Maya', 'Melanie', 'Mia', 'Michelle', 'Miriam', 'Molly',
    'Morgan', 'Moshe', 'Naomi', 'Natalia', 'Natalie', 'Nathan', 'Nathaniel', 'Nevaeh',
    'Nicholas', 'Nicole', 'Noah', 'Oliver', 'Olivia', 'Owen', 'Paige', 'Patrick',
    'Peyton', 'Rachel', 'Rebecca', 'Richard', 'Riley', 'Robert', 'Ryan', 'Samantha',
    'Samuel', 'Sara', 'Sarah', 'Savannah', 'Scarlett', 'Sean', 'Sebastian', 'Serenity',
    'Sofia', 'Sophia', 'Sophie', 'Stella', 'Steven', 'Sydney', 'Taylor', 'Thomas',
    'Tristan', 'Tyler', 'Valentina', 'Victoria', 'Vincent', 'William', 'Wyatt',
    'Xavier', 'Zachary', 'Zoe', 'Zoey'];

    namesSrcData.forEach(function (item, index) {
        ViewModel.data.names.push({name: item, firstLetter: item[0]
        });
    });

    ViewModel.data.groupedNames = ViewModel.data.names.createGrouped(
        function (item) { return item.firstLetter; },
        function (item) { return item; },
        function (g1, g2) { return g1 < g2 ? -1 : g1 > g2 ? 1 : 0; }
    );

})();



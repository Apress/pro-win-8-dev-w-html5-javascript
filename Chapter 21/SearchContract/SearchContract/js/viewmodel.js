
(function () {

    var rawData = ['Aaliyah', 'Aaron', 'Abigail', 'Abraham', 'Adam', 'Addison', 'Adrian',
        'Adriana', 'Aidan', 'Aiden', 'Alex', 'Alexa', 'Alexander', 'Alexandra', 'Alexis',
        'Allison', 'Alyssa', 'Amelia', 'Andrew', 'Angel', 'Angelina', 'Anna', 'Anthony',
        'Ariana', 'Arianna', 'Ashley', 'Aubrey', 'Austin', 'Ava', 'Avery', 'Ayden',
        'Bella', 'Benjamin', 'Blake', 'Brandon', 'Brayden', 'Brian', 'Brianna', 'Brooke',
        'Bryan', 'Caleb', 'Cameron', 'Camila', 'Carter', 'Charles', 'Charlotte', 'Chase',
        'Chaya', 'Chloe', 'Christian', 'Christopher', 'Claire', 'Connor', 'Daniel',
        'David', 'Dominic', 'Dylan', 'Eli', 'Elijah', 'Elizabeth', 'Ella', 'Emily',
        'Emma', 'Eric', 'Esther', 'Ethan', 'Eva', 'Evan', 'Evelyn', 'Faith', 'Gabriel',
        'Gabriella', 'Gabrielle', 'Gavin', 'Genesis', 'Gianna', 'Giovanni', 'Grace',
        'Hailey', 'Hannah', 'Henry', 'Hunter', 'Ian', 'Isaac', 'Isabella', 'Isaiah',
        'Jack', 'Jackson', 'Jacob', 'Jacqui', 'Jaden', 'Jake', 'James', 'Jasmine',
        'Jason', 'Jayden', 'Jeremiah', 'Jeremy', 'Jessica', 'Joel', 'John', 'Jonathan',
        'Jordan', 'Jose', 'Joseph', 'Joshua', 'Josiah', 'Julia', 'Julian', 'Juliana',
        'Julianna', 'Justin', 'Kaitlyn', 'Katherine', 'Kayla', 'Kaylee', 'Kevin',
        'Khloe', 'Kimberly', 'Kyle', 'Kylie', 'Landon', 'Lauren', 'Layla', 'Leah', 'Leo',
        'Liam', 'Lillian', 'Lily', 'Logan', 'London', 'Lucas', 'Luis', 'Luke',
        'Mackenzie', 'Madeline', 'Madelyn', 'Madison', 'Makayla', 'Maria', 'Mason',
        'Matthew', 'Max', 'Maya', 'Melanie', 'Mia', 'Michelle', 'Miriam', 'Molly',
        'Morgan', 'Moshe', 'Naomi', 'Natalia', 'Natalie', 'Nathan', 'Nathaniel',
        'Nevaeh', 'Nicholas', 'Nicole', 'Noah', 'Oliver', 'Olivia', 'Owen', 'Paige',
        'Patrick', 'Peyton', 'Rachel', 'Rebecca', 'Richard', 'Riley', 'Robert', 'Ryan',
        'Samantha', 'Samuel', 'Sara', 'Sarah', 'Savannah', 'Scarlett', 'Sean',
        'Sebastian', 'Serenity', 'Sofia', 'Sophia', 'Sophie', 'Stella', 'Steven',
        'Sydney', 'Taylor', 'Thomas', 'Tristan', 'Tyler', 'Valentina', 'Victoria',
        'Vincent', 'William', 'Wyatt', 'Xavier', 'Zachary', 'Zoe', 'Zoey'];

    WinJS.Namespace.define("ViewModel", {
        allNames: [],
        filteredNames: new WinJS.Binding.List(),
        messages: new WinJS.Binding.List(),
        writeMessage: function (msg) {
            ViewModel.messages.push({ message: msg });
        },
        searchTerm: ""
    });

    rawData.forEach(function (item, index) {
        var item = { name: item, firstLetter: item[0] };
        ViewModel.allNames.push(item);
    });

    ViewModel.search = function (term, suggestions) {
        ViewModel.writeMessage("Searched for: " + (term == "" ? "empty string" : term));
        term = term.toLowerCase();
        var target = suggestions ? [] : ViewModel.filteredNames;
        target.length = 0;
        ViewModel.allNames.forEach(function (item) {
            if (item.name.toLowerCase().indexOf(term) > -1) {
                target.push(item)
            }
        });
        if (!suggestions) {
            ViewModel.searchTerm = term;
        }
        return target;
    };

    ViewModel.asyncSuggest = function (term) {
        return new WinJS.Promise(function (fDone, fError, fProgress) {
            var index = 0;
            var blockSize = 10;
            var matches = [];
            term = term.toLowerCase();

            function searchBlock() {
                for (var i = index; i < index + blockSize; i++) {
                    if (ViewModel.allNames[i].name.toLowerCase().indexOf(term) > -1) {
                        matches.push(ViewModel.allNames[i].name);
                    }
                }
                index += blockSize;
                if (index < ViewModel.allNames.length) {
                    setImmediate(searchBlock);
                } else {
                    fDone(matches);
                }
            }
            setImmediate(searchBlock);
        });
    }

})();
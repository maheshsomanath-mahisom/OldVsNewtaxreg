/* =====================================================
   Tax Calculator JavaScript
   Old vs New Tax Regime Calculator
===================================================== */



/* =====================================================
   Scroll Function
===================================================== */


function scrollToCalculator() {

    document
        .getElementById("calculator")
        .scrollIntoView({
            behavior: "smooth"
        });

}




/* =====================================================
   Utility Functions
===================================================== */


function getValue(id) {

    let value = document.getElementById(id).value;

    if(value === "" || isNaN(value)) {

        return 0;

    }

    return Number(value);

}




function formatCurrency(amount) {


    return "₹" + amount.toLocaleString("en-IN");

}






/* =====================================================
   Tax Calculation
===================================================== */


function calculateTax() {


    /*
       Income Inputs
    */


    let salary =
        getValue("salary");


    let otherIncome =
        getValue("otherIncome");


    let rentalIncome =
        getValue("rentalIncome");



    /*
       Deductions
    */


    let hra =
        getValue("hra");


    let section80c =
        getValue("section80c");


    let section80d =
        getValue("section80d");


    let homeLoan =
        getValue("homeLoan");


    let nps =
        getValue("nps");


    let otherDeduction =
        getValue("otherDeduction");




    /*
       Total Income
    */


    let grossIncome =
        salary +
        otherIncome +
        rentalIncome;



    /*
       Standard Deduction

       Applicable in both regimes
       Current limit considered:
       ₹75,000
    */


    let standardDeduction = 75000;




    /*
       OLD REGIME TAXABLE INCOME

    */


    let oldDeductions =

        standardDeduction +

        hra +

        section80c +

        section80d +

        homeLoan +

        nps +

        otherDeduction;



    let oldTaxableIncome =

        grossIncome -
        oldDeductions;



    if(oldTaxableIncome < 0){

        oldTaxableIncome = 0;

    }






    /*
       NEW REGIME TAXABLE INCOME

       Limited deductions allowed

    */


    let newTaxableIncome =

        grossIncome -
        standardDeduction;



    if(newTaxableIncome < 0){

        newTaxableIncome = 0;

    }






    /*
       Calculate Tax
    */


    let oldTax =
        calculateOldRegimeTax(
            oldTaxableIncome
        );



    let newTax =
        calculateNewRegimeTax(
            newTaxableIncome
        );






    /*
       Display Result
    */


    document
    .getElementById("oldIncome")
    .innerHTML =
        formatCurrency(oldTaxableIncome);



    document
    .getElementById("oldTax")
    .innerHTML =
        formatCurrency(oldTax);




    document
    .getElementById("newIncome")
    .innerHTML =
        formatCurrency(newTaxableIncome);



    document
    .getElementById("newTax")
    .innerHTML =
        formatCurrency(newTax);






    /*
       Comparison Table
    */


    document
    .getElementById("compareOldIncome")
    .innerHTML =
        formatCurrency(oldTaxableIncome);



    document
    .getElementById("compareNewIncome")
    .innerHTML =
        formatCurrency(newTaxableIncome);




    document
    .getElementById("compareOldTax")
    .innerHTML =
        formatCurrency(oldTax);



    document
    .getElementById("compareNewTax")
    .innerHTML =
        formatCurrency(newTax);






    /*
       Recommendation

    */


    let message;



    if(oldTax < newTax) {


        message =
        "Old Tax Regime saves more tax";

    }

    else if(newTax < oldTax) {


        message =
        "New Tax Regime saves more tax";

    }

    else {


        message =
        "Both regimes have equal tax";

    }



    document
    .getElementById("recommendation")
    .innerHTML =
        message;



}









/* =====================================================
   Old Tax Regime Calculation
===================================================== */


function calculateOldRegimeTax(income){



    let tax = 0;



    /*
       Below 60 Years

       0 - 2.5 Lakh       Nil
       2.5 - 5 Lakh       5%
       5 - 10 Lakh        20%
       Above 10 Lakh      30%

    */



    if(income <= 250000){


        tax = 0;


    }


    else if(income <= 500000){


        tax =
        (income - 250000)
        * 0.05;


    }


    else if(income <= 1000000){


        tax =

        (250000 * 0.05)

        +

        ((income-500000)
        *0.20);



    }


    else {



        tax =

        (250000*0.05)

        +

        (500000*0.20)

        +

        ((income-1000000)
        *0.30);


    }





    /*
       Health & Education Cess

       4%

    */


    tax =
    tax +
    (tax * 0.04);



    return Math.round(tax);


}









/* =====================================================
   New Tax Regime Calculation
===================================================== */


function calculateNewRegimeTax(income){


    let tax = 0;



    /*
       New Regime Slabs

       0 - 4L        Nil
       4 - 8L        5%
       8 - 12L       10%
       12 - 16L      15%
       16 - 20L      20%
       20 - 24L      25%
       Above 24L     30%

    */





    if(income <= 400000){


        tax=0;


    }


    else if(income <=800000){


        tax =
        (income-400000)
        *0.05;


    }


    else if(income<=1200000){


        tax =

        (400000*0.05)

        +

        ((income-800000)
        *0.10);



    }


    else if(income<=1600000){


        tax =

        (400000*0.05)

        +

        (400000*0.10)

        +

        ((income-1200000)
        *0.15);



    }


    else if(income<=2000000){


        tax =

        (400000*0.05)

        +

        (400000*0.10)

        +

        (400000*0.15)

        +

        ((income-1600000)
        *0.20);



    }


    else if(income<=2400000){


        tax =

        (400000*0.05)

        +

        (400000*0.10)

        +

        (400000*0.15)

        +

        (400000*0.20)

        +

        ((income-2000000)
        *0.25);



    }


    else {



        tax =

        (400000*0.05)

        +

        (400000*0.10)

        +

        (400000*0.15)

        +

        (400000*0.20)

        +

        (400000*0.25)

        +

        ((income-2400000)
        *0.30);


    }





    /*
       Health & Education Cess

       4%

    */


    tax =
    tax +
    (tax*0.04);



    return Math.round(tax);



}








/* =====================================================
   Reset Calculator
===================================================== */


function resetCalculator(){



    let inputs =
    document.querySelectorAll(
        "input"
    );



    inputs.forEach(
        function(input){

            input.value="";

        }
    );




    document
    .getElementById("oldIncome")
    .innerHTML="₹0";


    document
    .getElementById("newIncome")
    .innerHTML="₹0";


    document
    .getElementById("oldTax")
    .innerHTML="₹0";


    document
    .getElementById("newTax")
    .innerHTML="₹0";


    document
    .getElementById("recommendation")
    .innerHTML=
    "Calculate to see result";



}
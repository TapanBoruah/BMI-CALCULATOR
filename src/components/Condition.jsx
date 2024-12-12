export const bmiConditions=[
    {range:"Less than 16",condition:"Severe Thinness"},
    {range:"16-17",condition:"Moderate Thinness"},
    {range:"17-18.5",condition:"Mild Thinness"},
    {range:"18.5-25",condition:"Normal"},
    {range:"25-30",condition:"Over Weight"},
    {range:"30-35",condition:"Obese Class I"},
    {range:"35-40",condition:"Obese Class II"},
    {range:"Greater than 40",condition:"Obese Class III"},

];

export function getCondition(bmi){
    if(bmi<16){
        return "Severe Thinness";
    }else if(bmi >=16 &&bmi <17){
        return "Moderate Thinness";
    }else if(bmi >=17 && bmi<18.5){
        return "Mild Thinness";
    }else if(bmi>=18.5 && bmi <25){
        return "Normal";
    }else if(bmi>=25&&bmi<30){
        return "Over Weight";
    }else if(bmi>=30 && bmi<35){
        return "Obese Class I";
    }else if(bmi>=35&& bmi<40){
        return "Obese Class II";
    }else if(bmi>=40){
        return "Obese Class III";
    }else{
        return 'Invalid BMI';
    }
}
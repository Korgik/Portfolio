<?php
/**
 * Created by PhpStorm.
 * User: Akinf
 * Date: 08.11.2017
 * Time: 12:04
 */
function _log($data){
    \Yii::info(\yii\helpers\VarDumper::dumpAsString($data, 5), '_');
}

function _end($data){
    echo \yii\helpers\VarDumper::dumpAsString($data, 5, true);
    exit();
}

/**
 * @return \yii\console\Application|\yii\web\Application|app\components\Application
 */
function app(){
    return \Yii::$app;
}
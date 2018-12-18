// Should be JSON, but nah.  Let's go old school bois.

const arCombat = [
['Extr Close','1:2','1:1','2:1','3:1','4:1','8:1','12:1','16:1','20:1','28:1','36:1','44:1','52:1'],
['Very Close','1:3','1:2','1:1','2:1','3:1','4:1','6:1','9:1','12:1','15:1','18:1','21:1','24:1'],
['Close','1:4','1:3','1:2','1:1','2:1','3:1','4:1','6:1','8:1','10:1','12:1','15:1','18:1'],
['Open','1:5','1:4','1:3','1:2','1:1','2:1','3:1','4:1','5:1','7:1','9:1','11:1','13:1'],
['1','AL2','AL2','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','AL1 DL1o1'],
['2','AL2','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 DL1o1','Ao1 DL1o1'],
['3','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1'],
['4','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2'],
['5','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2'],
['6','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ae4 DL1o2','Ae4 DL1o2'],
['7','AL1o1','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG'],
['8','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG'],
['9','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG'],
['10','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG'],
['11','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG'],
['12','AL1o1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG','Ae2 DL2o3DG'],
['13','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o2','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG'],
['14','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG'],
['15','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2DG','Ae3 DL2o2DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG','Ae2 DL2o3DG'] ];

const arBarrage = [
['1','2','3-4,','5-7','8-11','12-16','17-24','25-40','41-68','69-116','117+'],
['1T','1T','2T','2T','2T','3T','3T','4T','6T','8T','10T'],
['2','-','-','-','-','-','-','-','-','-','DG','DG'],
['3','-','-','-','-','-','-','-','-','DG','DG','DG'],
['4','-','-','-','-','-','-','-','DG','DG','DG','DG'],
['5','-','-','-','-','-','-','DG','DG','DG','DG','[1/2]'],
['6','-','-','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]'],
['7','-','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]','1/2'],
['8','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]','1/2','1/2'],
['9','-','-','DG','DG','DG','[1/2]','[1/2]','[1/2]','1/2','1/2','1/2'],
['10','-','DG','DG','DG','[1/2]','[1/2]','1/2','1/2','1/2','1','1'],
['11','DG','DG','DG','1/2','1/2','1/2','1/2','1/2','1','1','2'],
['12','DG','1/2','1/2','1/2','1/2','1','1','1','1','2','3'] ];


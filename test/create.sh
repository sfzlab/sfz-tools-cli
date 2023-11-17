root="./test/files"
filenames=("Cello_stacc_RR1_D#2_p.wav" "Upright1_Sus_C0_vl3_rr1.wav" "Trumpet_SusNV_Main_vl1_F4_rr2.wav" "A_029__F1_3.wav" "MartinGM2_040__E2_1.wav" "killer_bass_a5_vl1.wav" "VS_TremStr_C1.wav" "bagpipes_2reed_a4_ord_rr1.wav" "cithara_ab4_finger_rr1.wav")

rm -rf $root
mkdir $root

for filename in ${filenames[@]}; do
  echo "$root/$filename"
  touch "$root/$filename"
done
